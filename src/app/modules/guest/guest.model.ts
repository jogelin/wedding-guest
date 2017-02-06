export class Guest {
    name: string;
    email: string;
    groups: string[];
}

export class GuestListItem {
    guests: Guest[];
    address: string;
    "$key":string;
}
