import { supabase } from './client';
import { Lead } from '../../types';

// Converteer database lead naar Lead type
function dbLeadToLead(dbLead: any): Lead {
  return {
    id: dbLead.id,
    name: dbLead.name,
    email: dbLead.email,
    phone: dbLead.phone,
    project: dbLead.project,
    date: new Date(dbLead.created_at).toLocaleDateString('nl-BE'),
    status: dbLead.status as Lead['status'],
    notes: dbLead.notes || [],
  };
}

// Haal alle leads op
export async function getLeads(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }

  return data ? data.map(dbLeadToLead) : [];
}

// Voeg een nieuwe lead toe
export async function createLead(leadData: Omit<Lead, 'id' | 'date' | 'status'>): Promise<Lead> {
  const { data, error } = await supabase
    .from('leads')
    .insert({
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      project: leadData.project,
      status: 'Nieuw',
      notes: leadData.notes || [],
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating lead:', error);
    throw error;
  }

  return dbLeadToLead(data);
}

// Update lead status
export async function updateLeadStatus(id: string, status: Lead['status']): Promise<Lead> {
  const { data, error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating lead status:', error);
    throw error;
  }

  return dbLeadToLead(data);
}

// Update lead (volledig)
export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
  const updateData: any = {};
  
  if (updates.name) updateData.name = updates.name;
  if (updates.email) updateData.email = updates.email;
  if (updates.phone) updateData.phone = updates.phone;
  if (updates.project) updateData.project = updates.project;
  if (updates.status) updateData.status = updates.status;
  if (updates.notes) updateData.notes = updates.notes;

  const { data, error } = await supabase
    .from('leads')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating lead:', error);
    throw error;
  }

  return dbLeadToLead(data);
}

// Verwijder een lead
export async function deleteLead(id: string): Promise<void> {
  const { error } = await supabase
    .from('leads')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting lead:', error);
    throw error;
  }
}

