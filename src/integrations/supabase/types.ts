export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      backgrounds: {
        Row: {
          created_at: string | null
          id: string
          name: string
          type: string
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          type: string
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          type?: string
          url?: string
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          created_at: string | null
          event_id: string | null
          id: string
          qr_code: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          qr_code?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          qr_code?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          city: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          date: string
          description: string | null
          duration: number
          id: string
          instructor: string
          location: string
          max_capacity: number
          title: string
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          date: string
          description?: string | null
          duration: number
          id?: string
          instructor: string
          location: string
          max_capacity: number
          title: string
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          duration?: number
          id?: string
          instructor?: string
          location?: string
          max_capacity?: number
          title?: string
        }
        Relationships: []
      }
      gift_code_redemptions: {
        Row: {
          code_id: string | null
          id: string
          points_awarded: number | null
          redeemed_at: string | null
          user_id: string | null
        }
        Insert: {
          code_id?: string | null
          id?: string
          points_awarded?: number | null
          redeemed_at?: string | null
          user_id?: string | null
        }
        Update: {
          code_id?: string | null
          id?: string
          points_awarded?: number | null
          redeemed_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gift_code_redemptions_code_id_fkey"
            columns: ["code_id"]
            isOneToOne: false
            referencedRelation: "gift_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      gift_codes: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          expires_at: string | null
          id: string
          max_uses: number
          max_uses_per_user: number
          points: number
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          max_uses: number
          max_uses_per_user: number
          points: number
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          max_uses?: number
          max_uses_per_user?: number
          points?: number
        }
        Relationships: []
      }
      music_tracks: {
        Row: {
          created_at: string | null
          id: string
          name: string
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          url?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          first_name: string | null
          id: string
          is_admin: boolean | null
          last_name: string | null
          points: number | null
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          id: string
          is_admin?: boolean | null
          last_name?: string | null
          points?: number | null
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          id?: string
          is_admin?: boolean | null
          last_name?: string | null
          points?: number | null
        }
        Relationships: []
      }
      scripts: {
        Row: {
          background_id: string | null
          content: string
          created_at: string | null
          id: string
          music_id: string | null
          notification_sound: boolean | null
          title: string
        }
        Insert: {
          background_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          music_id?: string | null
          notification_sound?: boolean | null
          title: string
        }
        Update: {
          background_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          music_id?: string | null
          notification_sound?: boolean | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "scripts_background_id_fkey"
            columns: ["background_id"]
            isOneToOne: false
            referencedRelation: "backgrounds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scripts_music_id_fkey"
            columns: ["music_id"]
            isOneToOne: false
            referencedRelation: "music_tracks"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      redeem_gift_code: {
        Args: {
          code_text: string
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
