# Google Cloud Storage - Bucket Publiek Maken (Stap-voor-Stap)

## ✅ Huidige Status

- ✅ Public Access Prevention: **OK** (Inherited)
- ❌ IAM Policy: **Ontbreekt** (moet worden toegevoegd)
- ❌ Bestanden: **Niet publiek** (HTTP 403)

## 🎯 Wat Moet Er Gebeuren

Je hoeft alleen nog **één stap** te doen: de IAM policy toevoegen.

---

## 📋 Stap-voor-Stap Instructies

### Stap 1: Open Google Cloud Console

1. **Klik op deze link** (opent in nieuwe tab):
   ```
   https://console.cloud.google.com/storage/browser/yannova-media?project=gen-lang-client-0141118397
   ```

2. **Of ga handmatig**:
   - Open: https://console.cloud.google.com/
   - Selecteer project: `gen-lang-client-0141118397`
   - Ga naar: **Storage** → **Buckets**
   - Klik op bucket: `yannova-media`

### Stap 2: Open Permissions Tab

1. **Bovenaan de pagina** zie je verschillende tabs:
   - Overview
   - **Permissions** ← **KLIK HIEROP**
   - Lifecycle
   - etc.

2. **Klik op "Permissions"** tab

### Stap 3: Voeg Publieke Toegang Toe

1. **Zoek de knop** "GRANT ACCESS" (of "TOEGANG VERLENEN")
   - Deze staat meestal bovenaan de permissions lijst
   - Grote blauwe knop

2. **Klik op "GRANT ACCESS"**

3. **Er opent een popup/dialog**. Vul in:
   
   **New principals:**
   ```
   allUsers
   ```
   ⚠️ **Let op**: Typ exact `allUsers` (geen quotes, geen spaties)
   
   **Select a role:**
   - Klik op het dropdown menu
   - Zoek en selecteer: **"Storage Object Viewer"**
   - (Dit staat meestal onder "Cloud Storage" sectie)

4. **Klik op "SAVE"** (onderaan de popup)

### Stap 4: Bevestig Waarschuwing

1. **Je ziet mogelijk een waarschuwing**:
   ```
   Warning: Making this bucket public will make all objects in the bucket publicly accessible.
   ```

2. **Dit is normaal** - klik op **"Allow public access"** of **"Confirm"**

3. **Wacht even** - de wijziging wordt verwerkt (1-2 seconden)

### Stap 5: Verificatie

1. **Je zou nu moeten zien** in de Permissions lijst:
   - Een nieuwe regel met:
     - **Principal**: `allUsers`
     - **Role**: `Storage Object Viewer`

2. **Test in terminal**:
   ```bash
   curl -I https://storage.googleapis.com/yannova-media/images/Gemini_Generated_Image_12huit12huit12hu.png
   ```

3. **Je zou moeten zien**:
   ```
   HTTP/2 200
   ```
   In plaats van:
   ```
   HTTP/2 403
   ```

4. **Of test in browser**:
   Open deze URL:
   ```
   https://storage.googleapis.com/yannova-media/images/Gemini_Generated_Image_12huit12huit12hu.png
   ```
   Je zou de foto moeten zien!

---

## 🔍 Troubleshooting

### "GRANT ACCESS" knop is grijs/niet klikbaar

**Oplossing**: 
- Controleer of je bent ingelogd met het juiste Google account
- Controleer of je toegang hebt tot project `gen-lang-client-0141118397`
- Vraag de project administrator om je de "Storage Admin" rol te geven

### "allUsers" wordt niet geaccepteerd

**Oplossing**:
- Zorg dat je exact `allUsers` typt (geen quotes, geen spaties)
- Gebruik geen hoofdletters behalve de U
- Probeer het opnieuw

### Waarschuwing verschijnt niet

**Oplossing**: 
- Dit is OK - niet alle accounts zien de waarschuwing
- Ga gewoon door met "SAVE"

### Na "SAVE" zie je nog steeds geen allUsers in de lijst

**Oplossing**:
- Wacht 5-10 seconden en ververs de pagina (F5)
- Controleer of er geen error message verscheen
- Probeer opnieuw

### Test geeft nog steeds 403

**Oplossing**:
1. Wacht 30-60 seconden (DNS/Cloud propagation)
2. Controleer of allUsers echt in de Permissions lijst staat
3. Test opnieuw:
   ```bash
   ./scripts/check-bucket-status.sh
   ```

---

## ✅ Checklist

Gebruik deze checklist om te verifiëren dat alles correct is:

- [ ] Ik ben ingelogd in Google Cloud Console
- [ ] Ik zie de bucket `yannova-media`
- [ ] Ik ben op de "Permissions" tab
- [ ] Ik heb "GRANT ACCESS" geklikt
- [ ] Ik heb `allUsers` ingevuld als principal
- [ ] Ik heb "Storage Object Viewer" geselecteerd als role
- [ ] Ik heb "SAVE" geklikt
- [ ] Ik heb de waarschuwing bevestigd (als deze verscheen)
- [ ] Ik zie `allUsers` in de Permissions lijst
- [ ] Test geeft HTTP 200 (niet 403)

---

## 🎉 Klaar!

Als alle stappen zijn voltooid en de test geeft HTTP 200, dan zijn **alle 35 foto's** nu publiek toegankelijk!

**Alle URLs**:
```
https://storage.googleapis.com/yannova-media/images/[bestandsnaam]
```

**Voorbeelden**:
- https://storage.googleapis.com/yannova-media/images/Gemini_Generated_Image_12huit12huit12hu.png
- https://storage.googleapis.com/yannova-media/images/yannova-team.jpg
- https://storage.googleapis.com/yannova-media/images/crepi-patterns.jpg

---

**Laatste update**: 25 december 2025

