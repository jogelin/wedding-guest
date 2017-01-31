export class Guest {
    name: string;
    email: string;
    groups: string[];
    match: boolean = true;//
}

export class GuestListItem {
    guests: Guest[];
    address: string;
}
