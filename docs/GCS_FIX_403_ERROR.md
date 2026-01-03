# Fix 403 Error - Google Cloud Storage Publieke Toegang

## ❌ Probleem

Je krijgt een `403 Forbidden` error bij het openen van bestanden:
```
HTTP/2 403
```

Dit betekent dat de bucket nog niet publiek is.

## ✅ Oplossing: 2 Stappen

### Stap 1: Public Access Prevention Uitschakelen

De bucket heeft "Public Access Prevention" ingeschakeld, wat publieke toegang blokkeert.

**Via Google Cloud Console** (Aanbevolen):

1. **Open Google Cloud Console**:
   ```
   https://console.cloud.google.com/storage/browser/yannova-media?project=gen-lang-client-0141118397
   ```

2. **Klik op "Permissions" tab** (bovenaan de pagina)

3. **Zoek "Public access prevention"** sectie

4. **Klik op "Edit"** (pencil icoon) naast "Public access prevention"

5. **Wijzig de instelling**:
   - Van: `Enforced` (blokkeert alle publieke toegang)
   - Naar: `Inherited` (gebruikt project-level instelling)

6. **Klik "Save"**

**Let op**: Je ziet mogelijk een waarschuwing. Dit is normaal - klik "Confirm" om door te gaan.

### Stap 2: Publieke Toegang Toevoegen (IAM Policy)

Na het uitschakelen van Public Access Prevention, voeg publieke toegang toe:

1. **Blijf op de "Permissions" tab**

2. **Klik op "GRANT ACCESS"** (of "TOEGANG VERLENEN") knop

3. **Voeg nieuwe principal toe**:
   - **New principals**: `allUsers`
   - **Select a role**: `Storage Object Viewer`
   
4. **Klik "SAVE"**

**Let op**: Je ziet mogelijk een waarschuwing over publieke toegang. Dit is normaal - klik "Allow public access" om door te gaan.

## ✅ Verificatie

Na beide stappen, test opnieuw:

```bash
curl -I https://storage.googleapis.com/yannova-media/images/Gemini_Generated_Image_12huit12huit12hu.png
```

Je zou nu moeten zien:
```
HTTP/2 200
```

In plaats van:
```
HTTP/2 403
```

## 🔧 Via gcloud CLI (Als je rechten hebt)

Als je `storage.buckets.update` en `storage.buckets.setIamPolicy` rechten hebt:

```bash
# Stap 1: Public Access Prevention uitschakelen
gcloud storage buckets update gs://yannova-media \
  --public-access-prevention=inherited \
  --project=gen-lang-client-0141118397

# Stap 2: Publieke toegang toevoegen
gcloud storage buckets add-iam-policy-binding gs://yannova-media \
  --member=allUsers \
  --role=roles/storage.objectViewer \
  --project=gen-lang-client-0141118397
```

## ⚠️ Troubleshooting

### "Permission denied" bij gcloud commando's

**Oplossing**: Gebruik de Google Cloud Console (stappen hierboven) - dit werkt altijd.

### Public Access Prevention kan niet worden uitgeschakeld

**Mogelijke oorzaken**:
- Je hebt geen `storage.buckets.update` rechten
- De bucket heeft organization-level policies die dit blokkeren

**Oplossing**: Vraag de project administrator om:
1. Je de "Storage Admin" rol te geven, OF
2. Public Access Prevention handmatig uit te schakelen

### IAM Policy kan niet worden toegevoegd

**Mogelijke oorzaken**:
- Public Access Prevention is nog ingeschakeld
- Je hebt geen `storage.buckets.setIamPolicy` rechten

**Oplossing**: 
1. Zorg dat Stap 1 (Public Access Prevention uitschakelen) eerst is voltooid
2. Vraag de project administrator om je de "Storage Admin" rol te geven

## 📋 Checklist

- [ ] Public Access Prevention is uitgeschakeld (Inherited)
- [ ] IAM policy is toegevoegd (allUsers → Storage Object Viewer)
- [ ] Test geeft HTTP 200 (niet 403)
- [ ] Bestanden zijn toegankelijk in browser

## 🔗 Handige Links

- **Google Cloud Console**: https://console.cloud.google.com/storage/browser/yannova-media?project=gen-lang-client-0141118397
- **Documentatie**: https://cloud.google.com/storage/docs/using-uniform-bucket-level-access
- **IAM Policies**: https://cloud.google.com/storage/docs/access-control/iam

---

**Laatste update**: 25 december 2025

