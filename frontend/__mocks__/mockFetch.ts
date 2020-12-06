import * as misc from "./misc";

export const  mockFetch = (status: number, data?: { [key: string]: string }) => {
    const response = { status, json: () => Promise.resolve(data) };

     const a = jest.spyOn(misc, "getGlobalObject");

    a.mockReturnValue({ fetch: () => Promise.resolve(response) });
}