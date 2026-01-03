# Google Cloud Storage - Publieke Toegang Instellen

## ✅ Status

- ✅ Bucket `yannova-media` bestaat
- ✅ Upload script werkt (35 foto's geüpload)
- ⚠️ Bestanden zijn nog **niet publiek toegankelijk**
- ⚠️ Bucket heeft "Public Access Prevention" ingeschakeld

## 🚀 Oplossing: Maak Bucket Publiek

### Stap 1: Public Access Prevention Uitschakelen

De bucket heeft "Public Access Prevention" ingeschakeld, wat publieke toegang blokkeert. Dit moet eerst worden uitgeschakeld.

**Via Google Cloud Console**:
1. Ga naar: https://console.cloud.google.com/storage/browser/yannova-media?project=gen-lang-client-0141118397
2. Klik op **"Permissions"** tab
3. Zoek **"Public access prevention"**
4. Klik op **"Edit"** (pencil icoon)
5. Wijzig van **"Enforced"** naar **"Inherited"**
6. Klik **"Save"**

**Via gcloud CLI** (als je rechten hebt):
```bash
gcloud storage buckets update gs://yannova-media \
  --public-access-prevention=inherited \
  --project=gen-lang-client-0141118397
```

### Stap 2: Publieke Toegang Toevoegen

Na het uitschakelen van Public Access Prevention, voeg publieke toegang toe:

**Via Google Cloud Console**:
1. Blijf op de **"Permissions"** tab
2. Klik op **"GRANT ACCESS"** (of "TOEGANG VERLENEN")
3. Voeg toe:
   - **Principal**: `allUsers`
   - **Role**: `Storage Object Viewer`
4. Klik **"SAVE"**

**Via gcloud CLI** (als je rechten hebt):
```bash
gcloud storage buckets add-iam-policy-binding gs://yannova-media \
  --member=allUsers \
  --role=roles/storage.objectViewer \
  --project=gen-lang-client-0141118397
```

### Stap 3: Test Publieke Toegang

Test of een bestand publiek toegankelijk is:

```bash
# Vervang [bestandsnaam] met een geüploade foto
curl -I https://storage.googleapis.com/yannova-media/images/[bestandsnaam]
```

Je zou een `200 OK` response moeten krijgen.

## 🔧 Helper Script

Er is een helper script beschikbaar:

```bash
./scripts/make-bucket-public.sh
```

Dit script probeert beide stappen automatisch uit te voeren, en geeft handmatige instructies als je geen rechten hebt.

## ⚠️ Belangrijk

- **Security**: Door de bucket publiek te maken, zijn **alle bestanden** in de bucket publiek toegankelijk
- **Gebruik**: Dit is alleen geschikt voor publieke media (foto's, video's, etc.)
- **Alternatief**: Voor private bestanden, gebruik signed URLs of authenticatie

## 📊 Huidige Status

- ✅ 35 foto's geüpload naar `gs://yannova-media/images/`
- ⚠️ Bestanden zijn nog niet publiek (Public Access Prevention actief)
- 📝 URLs zijn gegenereerd maar werken nog niet zonder authenticatie

## 🔗 URLs

Na het instellen van publieke toegang, zijn alle bestanden beschikbaar op:

```
https://storage.googleapis.com/yannova-media/images/[bestandsnaam]
```

Voorbeeld:
- `https://storage.googleapis.com/yannova-media/images/Gemini_Generated_Image_12huit12huit12hu.png`
- `https://storage.googleapis.com/yannova-media/images/yannova-team.jpg`

---

**Laatste update**: 25 december 2025

