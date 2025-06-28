const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

export interface APODData {
    title: string;
    explanation: string;
    url: string;
    date: string;
    media_type: string;
    copyright?: string;
    hdurl?: string;
}

export interface MarsPhoto {
    id: number;
    img_src: string;
    earth_date: string;
    camera: {
        name: string;
        full_name: string;
    };
    rover: {
        name: string;
        landing_date: string;
        launch_date: string;
        status: string;
    };
}

export interface NEOData {
    id: string;
    name: string;
    nasa_jpl_url: string;
    absolute_magnitude_h: number;
    estimated_diameter: {
        kilometers: {
            estimated_diameter_min: number;
            estimated_diameter_max: number;
        };
    };
    is_potentially_hazardous_asteroid: boolean;
    close_approach_data: Array<{
        close_approach_date: string;
        close_approach_date_full: string;
        relative_velocity: {
            kilometers_per_second: string;
            kilometers_per_hour: string;
            miles_per_hour: string;
        };
        miss_distance: {
            astronomical: string;
            lunar: string;
            kilometers: string;
            miles: string;
        };
        orbiting_body: string;
    }>;
}

export interface SearchResult {
    href: string;
    data: Array<{
        nasa_id: string;
        title: string;
        description: string;
        date_created: string;
        media_type: string;
    }>;
    links: Array<{
        href: string;
        rel: string;
        render: string;
    }>;
}

class ApiService {
    private async fetchApi<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
        const url = new URL(`${API_BASE_URL}${endpoint}`);

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        }

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.data || data;
    }

    // APOD API
    async getAPOD(date?: string): Promise<APODData> {
        const params: Record<string, string> = {};
        if (date) params.date = date;
        return this.fetchApi<APODData>('/apod', Object.keys(params).length > 0 ? params : undefined);
    }

    // Mars Rover Photos API
    async getMarsPhotos(rover: string, earth_date: string, page: number = 1): Promise<{ photos: MarsPhoto[] }> {
        return this.fetchApi<{ photos: MarsPhoto[] }>('/mars', {
            rover,
            earth_date,
            page: page.toString()
        });
    }

    // NEO API
    async getNEOs(start_date: string, end_date: string): Promise<Record<string, NEOData[]>> {
        return this.fetchApi<Record<string, NEOData[]>>('/neo', {
            start_date,
            end_date
        });
    }

    // Search API
    async searchNASA(query: string, media_type?: string, year_start?: string, year_end?: string): Promise<SearchResult[]> {
        const params: Record<string, string> = { q: query };
        if (media_type) params.media_type = media_type;
        if (year_start) params.year_start = year_start;
        if (year_end) params.year_end = year_end;

        return this.fetchApi<SearchResult[]>('/search', params);
    }
}

export const apiService = new ApiService(); 