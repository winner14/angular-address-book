// export interface Contact {
//     id: number
//     name: string
//     phone: string
//     email: string
//     company?: string
//     job_title?: string
//     website?: string
//     address: string
//     note?: string
// }


export interface ContactResponse {
    data: Contact[]
    resp_code: string
    resp_desc: string
}

export interface Contact {
    id?: number
    name: string
    phone: string
    email: string
    company?: string
    job_title?: string
    website?: string
    address: string
    note?: string
}
