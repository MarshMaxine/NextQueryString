'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AppRouterInstance, NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * Helper class to work with query strings.
 *
 */
class QueryString {
    private params: URLSearchParams;
    private readonly pathname: string;
    private readonly router: AppRouterInstance;

    /**
     * Create a searchParam object and set the current path.
     *
     * @param query
     * @param path
     * @param router
     */
    constructor ( query: string, path: string, router: AppRouterInstance ) {
        this.params   = new URLSearchParams( query );
        this.pathname = path;
        this.router   = router;
    }

    /**
     * Delete a given query param.
     *
     * @param key
     */
    public delete ( key: string ): this {
        this.params.delete( key );
        return this;
    }

    /**
     * Get a single query param, and only the first value.
     *
     * @param key
     */
    public get ( key: string ): string | null {
        return this.params.get( key );
    }

    /**
     * Get all the values for a given query param.
     *
     * @param key
     */
    public getAll ( key: string ): string[] {
        return this.params.getAll( key );
    }

    /**
     * Create a full URL from current path and the
     * currently set query params.
     *
     */
    public getURL ( path?: string ): string {
        return `${path || this.pathname}?${this.params.toString()}`;
    }

    /**
     * Replace a query string with a new value, only if
     * it exists.
     *
     * @param key
     * @param value
     */
    public replace ( key: string, value: string ): this {
        if ( this.params.has( key ) ) {
            this.params.set( key, value );
        }
        return this;
    }

    /**
     * Set a query param, or append it if the value is an array.
     *
     * @param key
     * @param value
     */
    public set ( key: string, value: string | string[] ): this {
        if ( 'string' === typeof value ) {
            this.params.set( key, value );
        } else {
            for ( const v of value ) {
                this.params.append( key, v );
            }
        }
        return this;
    }

    /**
     * Convert the query params to a query string.
     */
    public toString (): string {
        return this.params.toString();
    }

    /**
     * Visit the current URL with the updated query string.
     *
     * @param opt
     */
    public visit ( opt?: { path?: string; push?: boolean, options?: NavigateOptions } ): void {
        opt?.push
            ? this.router.push( this.getURL( opt.path ), opt.options )
            : this.router.replace( this.getURL( opt?.path ), opt?.options );
    }
}

/**
 * Custom hook to quickly manage query strings.
 *
 */
export function useQueryString (): QueryString {
    const params = useSearchParams(),
          path   = usePathname(),
          router = useRouter();

    return new QueryString( params.toString(), path, router );
}