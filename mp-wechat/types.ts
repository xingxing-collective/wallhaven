enum Purity {
    sfw = "sfw"
}
type Tag = {
    id: number
    name: string
    alias: string
    category: string
    category_id: number
    created_at: Date
    purity: Purity
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
    tags?: Array<Tag>
    thumbs: {
        large: string
        original: string
        small: string
    }
    uploader?: {
        avatar: {
            "20px": string
            "32px": string
            "128px": string
            "200px": string
        }
        group: string
        username: string
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
    data: Array<WallHavenData> | WallHavenData
    meta?: WallHavenMeta
}


