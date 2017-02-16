export class Guest {
    name: string;
    email: string;
    tags: string[];
}

export class GuestListItem {
    guests: Guest[];
    address: string;
    $key?:string;
}
