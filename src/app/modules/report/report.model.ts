import {BehaviorSubject} from "rxjs/BehaviorSubject";
export interface ReportQuery {
    name: string;
    query: string;
}

export interface ReportCountRefresh {
    count: number;
    path: string[];
}

export interface ReportCount extends ReportQuery {
    count: number;
    icon: string;
}

export interface ReportCol extends ReportQuery {
    counts: ReportCount[];
}

export interface ReportRow extends ReportQuery {
    cols: ReportCol[];
}

export interface Report {
    headers: string[];
    rows: ReportRow[];
}

export abstract class ReportQueryBuilder<T extends ReportQueryBuilder<T>> {
    protected _name: string;
    protected _query: string;

    build(): ReportQuery {
        return {
            name: this._name,
            query: this._query
        } as ReportQuery;
    }

    abstract name(name: string): T;

    abstract query(query: string): T;
}

export class ReportCountBuilder extends ReportQueryBuilder<ReportCountBuilder> {
    private _count: number = 0;
    private _icon: string;

    build(): ReportCount {
        return Object.assign(super.build(),
            {
                count: this._count,
                icon: this._icon
            }
        ) as ReportCount;
    }

    icon(icon: string): ReportCountBuilder {
        this._icon = icon;
        return this;
    }

    name(name: string): ReportCountBuilder {
        this._name = name;
        return this;
    }

    query(query: string): ReportCountBuilder {
        this._query = query;
        return this;
    }
}
export class ReportColBuilder extends ReportQueryBuilder<ReportColBuilder> {
    private _counts: ReportCount[];

    build(): ReportCol {
        return Object.assign(super.build(),
            {
                counts: this._counts
            }
        ) as ReportCol;
    }

    counts(counts: ReportCount[]): ReportColBuilder {
        this._counts = counts;
        return this;
    }

    name(name: string): ReportColBuilder {
        this._name = name;
        return this;
    }

    query(query: string): ReportColBuilder {
        this._query = query;
        return this;
    }
}

export class ReportRowBuilder extends ReportQueryBuilder<ReportRowBuilder> {
    private _cols: ReportCol[] = [];

    build(): ReportRow {
        return Object.assign(super.build(),
            {
                cols: this._cols
            }
        ) as ReportRow;
    }

    cols(cols: ReportCol[]): ReportRowBuilder {
        this._cols = cols;
        return this;
    }

    name(name: string): ReportRowBuilder {
        this._name = name;
        return this;
    }

    query(query: string): ReportRowBuilder {
        this._query = query;
        return this;
    }
}

export class ReportBuilder {
    private _headers: string[];
    private _rows: ReportRow[];

    build(): Report {
        return {
            headers: this._headers,
            rows: this._rows
        } as Report;
    }

    headers(headers: string[]): ReportBuilder {
        this._headers = headers;
        return this;
    }

    rows(rows: ReportRow[]): ReportBuilder {
        this._rows = rows;
        return this;
    }
}

