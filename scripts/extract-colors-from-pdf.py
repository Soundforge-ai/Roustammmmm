#!/usr/bin/env python3
"""
Script om kleuren uit het Aluplast kleurenpalet PDF te extraheren.
"""
import sys
import re
import json
from pathlib import Path
from collections import defaultdict

try:
    import pdfplumber
except ImportError:
    print("Installeer benodigde libraries:")
    print("pip3 install pdfplumber pillow")
    sys.exit(1)

def extract_colors_from_pdf(pdf_path):
    """Extraheer kleuren en tekst uit PDF."""
    all_text = []
    color_data = []
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            print(f"PDF heeft {len(pdf.pages)} pagina's\n")
            
            for page_num, page in enumerate(pdf.pages, 1):
                # Extract tekst
                text = page.extract_text()
                if text:
                    all_text.append(f"=== Pagina {page_num} ===\n{text}\n")
                    
                    # Zoek naar kleurnamen en codes
                    lines = text.split('\n')
                    for line in lines:
                        line = line.strip()
                        if not line or len(line) < 2:
                            continue
                        
                        # Zoek naar RAL codes
                        ral_match = re.search(r'RAL\s*(\d{4})', line, re.IGNORECASE)
                        if ral_match:
                            ral_code = ral_match.group(1)
                            # Probeer kleurnaam te vinden (tekst voor of na RAL code)
                            name = re.sub(r'RAL\s*\d{4}', '', line, flags=re.IGNORECASE).strip()
                            if not name:
                                name = f"RAL {ral_code}"
                            color_data.append({
                                'name': name,
                                'ral': ral_code,
                                'page': page_num,
                                'line': line
                            })
                        
                        # Zoek naar hex codes
                        hex_match = re.search(r'#([0-9A-Fa-f]{6})', line)
                        if hex_match:
                            hex_code = hex_match.group(1)
                            name = re.sub(r'#\w+', '', line).strip()
                            if not name:
                                name = f"Kleur {hex_code}"
                            color_data.append({
                                'name': name,
                                'hex': f"#{hex_code}",
                                'page': page_num,
                                'line': line
                            })
                        
                        # Zoek naar Aludec/Woodec namen
                        if re.search(r'aludec|woodec|wood|aluminium', line, re.IGNORECASE):
                            color_data.append({
                                'name': line,
                                'page': page_num,
                                'line': line,
                                'type': 'special'
                            })
                
                # Print progress voor eerste 10 pagina's
                if page_num <= 10:
                    print(f"Pagina {page_num}: {len(text) if text else 0} karakters")
    
    except Exception as e:
        print(f"Fout bij lezen van PDF: {e}")
        import traceback
        traceback.print_exc()
        return [], []
    
    return color_data, all_text

def generate_color_list(color_data):
    """Genereer een TypeScript/JavaScript vriendelijke kleurenlijst."""
    colors_by_category = defaultdict(list)
    
    for item in color_data:
        name = item.get('name', 'Onbekend')
        hex_code = item.get('hex', '')
        ral = item.get('ral', '')
        
        # Categoriseer
        category = 'standard'
        if 'aludec' in name.lower():
            category = 'aludec'
        elif 'woodec' in name.lower() or 'wood' in name.lower() or 'oak' in name.lower():
            category = 'woodec'
        
        # Genereer ID
        color_id = name.lower().replace(' ', '-').replace('(', '').replace(')', '')
        color_id = re.sub(r'[^a-z0-9-]', '', color_id)
        
        # Schat hex code als die ontbreekt (gebruik RAL naar hex conversie of placeholder)
        if not hex_code and ral:
            # Placeholder - in productie zou je een RAL naar hex conversie tabel gebruiken
            hex_code = '#808080'  # Grijs als placeholder
        
        if name and (hex_code or ral):
            colors_by_category[category].append({
                'id': color_id,
                'name': name,
                'hex': hex_code,
                'ral': ral,
                'texture': 'metallic' if category == 'aludec' else ('wood' if category == 'woodec' else 'matte'),
                'category': category
            })
    
    return colors_by_category

if __name__ == "__main__":
    pdf_path = Path(__file__).parent.parent / "Kleurenpalet-Aluplast.pdf"
    
    if not pdf_path.exists():
        print(f"PDF bestand niet gevonden: {pdf_path}")
        sys.exit(1)
    
    print(f"Lezen van PDF: {pdf_path}\n")
    color_data, all_text = extract_colors_from_pdf(pdf_path)
    
    print(f"\n{'='*60}")
    print(f"Totaal {len(color_data)} kleurvermeldingen gevonden")
    print(f"{'='*60}\n")
    
    # Toon gevonden kleuren
    for item in color_data[:20]:  # Eerste 20
        print(f"  - {item.get('name', 'Onbekend')} (RAL: {item.get('ral', 'N/A')}, HEX: {item.get('hex', 'N/A')})")
    
    if len(color_data) > 20:
        print(f"  ... en {len(color_data) - 20} meer")
    
    # Genereer kleurenlijst
    colors_by_category = generate_color_list(color_data)
    
    print(f"\n{'='*60}")
    print("Gegenereerde kleurenlijst:")
    print(f"{'='*60}\n")
    
    for category, colors in colors_by_category.items():
        print(f"{category.upper()}: {len(colors)} kleuren")
        for color in colors[:5]:  # Eerste 5 per categorie
            print(f"  - {color['name']} ({color['hex']})")
        if len(colors) > 5:
            print(f"  ... en {len(colors) - 5} meer")
        print()
    
    # Sla op als JSON voor verdere verwerking
    output_file = Path(__file__).parent.parent / "extracted-colors.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump({
            'raw_data': color_data,
            'categorized': {k: v for k, v in colors_by_category.items()}
        }, f, indent=2, ensure_ascii=False)
    
    print(f"\nData opgeslagen in: {output_file}")
    print(f"\nTotaal unieke kleuren: {sum(len(v) for v in colors_by_category.values())}")
