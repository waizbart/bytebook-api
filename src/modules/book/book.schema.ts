import { object, string } from "yup";

export namespace BookSchema {
    export const create = object().shape({
        google_books_id: string().required("Google Books ID is required"),
        tag: string().required("Tag is required"),
        userId: string().required("User ID is required"),
    });

    export const update = object({
        google_books_id: string().optional(),
        tag: string().optional(),
        userId: string().optional(),
    });
}