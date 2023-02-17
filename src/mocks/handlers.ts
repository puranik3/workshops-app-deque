import { rest } from 'msw';
import workshops from './data/workshops.json';
import session from './data/session.json';

export const handlers = [
    rest.get( `https://workshops-server.herokuapp.com/workshops`, ( req, res, ctx ) => {
        let page : number | string | null = req.url.searchParams.get( '_page' );
        
        if( page !== null ) {
            page = +page;
        }

        if( page === null ) {
            return res(
                ctx.status( 200 ),
                ctx.json( workshops )
            );
        } else if( page === 1 ) {
            return res(
                ctx.status( 200 ),
                ctx.json( workshops.slice( 0, 10 ) )
            );
        } else if( page === 2 ) {
            return res(
                ctx.status( 200 ),
                ctx.json( workshops.slice( 10, 20 ) )
            );
        } else {
            return res(
                ctx.status( 200 ),
                ctx.json( [] )
            );
        }
    }),
    // ... more handlers
    rest.get( `https://workshops-server.herokuapp.com/workshops/2`, ( req, res, ctx ) => {
        return res(
            ctx.status( 200 ),
            ctx.json( workshops[1] )
        );
    }),
    rest.post( `https://workshops-server.herokuapp.com/sessions`, ( req, res, ctx ) => {
        return res(
            ctx.status( 200 ),
            ctx.json( session )
        );
    })
];

export const errorHandlers = [
    rest.get( `https://workshops-server.herokuapp.com/workshops`, ( req, res, ctx ) => {
        return res(
            ctx.status( 500 ),
            ctx.json( null )
        );
    })
];