# Next.js Query String Builder

This package aims to simply the way query strings are handled client-side, by providing a React client-hook to simply chain actions
and do everything in a one-liner.

Imagine a scenario where you need to delete a single query param, add another one and then redirect the user to another page. Here's how the typical code would look like:

```typescript
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const router   = useRouter();
const search   = useSearchParams();
const pathName = usePathname();

const params = new URLSearchParams( search.toString() );

params.delete( 'some-param' );
params.set( 'another-param', 'some-value' )

router.replace( `${pathName}?${params.toString()}` );
```

You can quickly end up with duplicate code and a cluttered codebase. However, with this package:

```typescript
import { useQueryString } from "next-query-string";

const query = useQueryString();
query.delete( 'some-param' ).set( 'another-param', 'some-value' ).visit();
```

Simple.

# How to install

Run the following command to install this package:

```bash
npm i next-query-string
```

Then follow the example above to use the hook.