import debug from "debug";

// Create different debug namespaces for easy filtering
export const searchLog = debug("app:search");
export const dbLog = debug("app:db");
export const apiLog = debug("app:api");
