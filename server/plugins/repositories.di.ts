import type { NitroApp } from "nitropack/types";
import type PocketBase from "pocketbase";
import UserApiLimitRepository from "../repositories/userapilimit.repository";


export default function bootstrapRepositoriesDepencies(nitroApp: NitroApp, pb_admin: PocketBase) {
    const userApiLimitRepository = new UserApiLimitRepository(pb_admin)

    nitroApp.hooks.hook("request", (event) => {
        event.context.$userApiLimitRepository = userApiLimitRepository
    });
}