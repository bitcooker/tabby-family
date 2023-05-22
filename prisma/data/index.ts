import type { Announcement } from "@prisma/client"

export const announcements: Announcement[] = [
    {
        id: 1,
        title: 'People worldwide',
        content: 'The people at Stripe are what bring and keep so many of us here, so we’ve made it easy to meet folks across the company.',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
    },
    {
        id: 2,
        title: 'Styling React-Calendar with custom CSS',
        content: 'The custom styles of React-Calendar look pretty good. But we always want our components to be consistent with the overall style of a product. The elements of React-Calendar have some classes already applied, which we can use to add our styles.',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
    }
]