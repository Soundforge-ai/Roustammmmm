# Supabase Migraties Uitvoeren

## Stap-voor-stap Instructies

### 1. Ga naar Supabase Dashboard
1. Open: https://supabase.com/dashboard/project/sbp_v0_6793ceacb6909ca9b7ccd580bda88c4a8bc93e3b
2. Klik op **SQL Editor** in het linker menu

### 2. Voer Migraties Uit (in deze volgorde!)

#### Migratie 1: Shared Functions
1. Open bestand: `supabase/migrations/000_shared_functions.sql`
2. Kopieer de volledige inhoud
3. Plak in SQL Editor
4. Klik op **Run** (of druk Ctrl+Enter)
5. ✅ Controleer: "Success. No rows returned"

#### Migratie 2: Chats Tabel
1. Open bestand: `supabase/migrations/003_create_chats_table.sql`
2. Kopieer de volledige inhoud
3. Plak in SQL Editor
4. Klik op **Run**
5. ✅ Controleer: "Success. No rows returned"

#### Migratie 3: Pages Tabel
1. Open bestand: `supabase/migrations/004_create_pages_table.sql`
2. Kopieer de volledige inhoud
3. Plak in SQL Editor
4. Klik op **Run**
5. ✅ Controleer: "Success. No rows returned"

#### Migratie 4: Settings Tabel
1. Open bestand: `supabase/migrations/005_create_settings_table.sql`
2. Kopieer de volledige inhoud
3. Plak in SQL Editor
4. Klik op **Run**
5. ✅ Controleer: "Success. No rows returned"

### 3. Verificatie

Ga naar **Table Editor** en controleer of deze tabellen bestaan:
- ✅ `chat_sessions`
- ✅ `pages`
- ✅ `app_settings`

### 4. Automatische Migratie

Na het uitvoeren van de migraties:
1. Refresh de website
2. De app zal automatisch proberen localStorage data naar Supabase te migreren
3. Check browser console voor migratie status

---

## Troubleshooting

### "function handle_updated_at() does not exist"
**Oplossing:** Voer eerst `000_shared_functions.sql` uit

### "relation already exists"
**Oplossing:** Tabel bestaat al, dit is OK. Skip deze migratie.

### "permission denied"
**Oplossing:** Controleer of je ingelogd bent in Supabase Dashboard

---

**Let op:** Migratie 002 (leads) is al uitgevoerd, deze hoef je niet opnieuw te doen.

