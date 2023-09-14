import Dexie from "dexie";

export const db = new Dexie('tb_cases');

db.version(1).stores({
    tb_cases: '++key, date, status',
})