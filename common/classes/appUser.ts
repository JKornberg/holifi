import { FormatUserType } from "../types/firebase_types";

// interface NamedParameters {
//     quote?: QuoteType;
//     email?: string,
//     company?: string
// }

export class AppUser {
    id: string;
    email: string;
    active: boolean | null;
    fName: string;
    lName: string;
    twitterId: string | null;
    twitterHandle: string | null;
    admin: boolean;
    token: string;

    constructor(user: FormatUserType) {
        this.id = user.uid;
        this.token = user.token;
        this.email = user.email;
        this.active = user.active ?? false;
        this.fName = user.fname ?? "User";
        this.lName = user.lname ?? "User";
        this.twitterId = user.twitterId ?? null;
        this.twitterHandle = user.twitterHandle ?? null;
        this.admin = false;
    }

    addFirestoreData(data: any) {
        this.active = data.active;
        this.fName = data.fName;
        this.lName = data.lName;
        this.twitterId = data.twitterId;
        this.twitterHandle = data.twitterHandle;
    }

    toObjectForFirebase() {
        //leave out id as this is not a field in firebase
        return {
            id: this.id,
            email: this.email,
            active: this.active ?? false,
            fName: this.fName ?? "",
            lName: this.lName ?? "",
            twitterId: this.twitterId ?? '',
            twitterHandle: this.twitterHandle ?? ''

        }
    }
    toObject() {
        //leave out id as this is not a field in firebase
        return {
            id: this.id,
            email: this.email,
            active: this.active,
            fName: this.fName,
            lName: this.lName,
            twitterId: this.twitterId,
            twitterHandle: this.twitterHandle
        }
    }

}