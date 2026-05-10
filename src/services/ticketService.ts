import { supabase, isSupabaseConfigured, Ticket } from '../lib/supabase';

// Mock database for development
const mockTickets: Ticket[] = [];

/**
 * Generate QR code string
 */
function generateCodigoQR(id_reserva: string): string {
  const timestamp = Date.now();
  return `GH-${id_reserva}-${timestamp}`;
}

/**
 * Create a new ticket
 */
export async function createTicket(id_reserva: string): Promise<{ success: boolean; ticket?: Ticket; error?: string }> {
  const codigo_qr = generateCodigoQR(id_reserva);

  if (!isSupabaseConfigured || !supabase) {
    const newTicket: Ticket = {
      id_ticket: String(mockTickets.length + 1),
      id_reserva,
      codigo_qr,
      fecha_emision: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockTickets.push(newTicket);
    return { success: true, ticket: newTicket };
  }

  try {
    const { data, error } = await supabase
      .from('tickets')
      .insert([{
        id_reserva,
        codigo_qr,
      }])
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, ticket: data };
  } catch (error) {
    return { success: false, error: 'Error al crear ticket' };
  }
}

/**
 * Get ticket by ID
 */
export async function getTicketById(id_ticket: string): Promise<{ success: boolean; ticket?: Ticket; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const ticket = mockTickets.find(t => t.id_ticket === id_ticket);
    if (!ticket) {
      return { success: false, error: 'Ticket no encontrado' };
    }
    return { success: true, ticket };
  }

  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('id_ticket', id_ticket)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, ticket: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener ticket' };
  }
}

/**
 * Get ticket by reserva
 */
export async function getTicketByReserva(id_reserva: string): Promise<{ success: boolean; ticket?: Ticket; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const ticket = mockTickets.find(t => t.id_reserva === id_reserva);
    if (!ticket) {
      return { success: false, error: 'Ticket no encontrado' };
    }
    return { success: true, ticket };
  }

  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('id_reserva', id_reserva)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, ticket: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener ticket' };
  }
}

/**
 * Get ticket by QR code
 */
export async function getTicketByCodigoQR(codigo_qr: string): Promise<{ success: boolean; ticket?: Ticket; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const ticket = mockTickets.find(t => t.codigo_qr === codigo_qr);
    if (!ticket) {
      return { success: false, error: 'Ticket no encontrado' };
    }
    return { success: true, ticket };
  }

  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('codigo_qr', codigo_qr)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, ticket: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener ticket' };
  }
}

/**
 * Get all tickets (admin)
 */
export async function getAllTickets(): Promise<{ success: boolean; tickets?: Ticket[]; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: true, tickets: [...mockTickets] };
  }

  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('fecha_emision', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, tickets: data };
  } catch (error) {
    return { success: false, error: 'Error al obtener tickets' };
  }
}

/**
 * Delete ticket
 */
export async function deleteTicket(id_ticket: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const index = mockTickets.findIndex(t => t.id_ticket === id_ticket);
    if (index === -1) {
      return { success: false, error: 'Ticket no encontrado' };
    }
    mockTickets.splice(index, 1);
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('tickets')
      .delete()
      .eq('id_ticket', id_ticket);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Error al eliminar ticket' };
  }
}
