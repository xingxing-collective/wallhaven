enum Purity {
    sfw = "sfw"
}
export type WallHavenData = {
    id: string
    category: string
    colors: string[]
    created_at: Date
    dimension_x: number
    dimension_y: number
    favorites: number
    file_size: number
    file_type: string
    path: string
    purity: Purity
    radio: string
    resolution: string
    short_url: string
    source: string
    thumbs: {
        large: string
        original: string
        small: string
    }
    url: string
    views: number
};
export type WallHavenMeta = {
    current_page: number
    last_page: number
    per_page: number
    query: string | null
    send: string | null
    total: number
};

export type WallHavenResponse = {
    data: Array<WallHavenData>
    meta: WallHavenMeta
}