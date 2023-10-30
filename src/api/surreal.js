import { Surreal } from 'surrealdb.js'

// Define connection details for our surrealdb instance.
export const SurrealEndpoint =
    process.env.REACT_APP_NEXT_PUBLIC_SURREAL_ENDPOINT ?? `http://localhost:8000/rpc`;
export const SurrealNamespace =
    process.env.REACT_APP_NEXT_PUBLIC_SURREAL_NAMESPACE ?? 'test';
export const SurrealDatabase =
    process.env.REACT_APP_NEXT_PUBLIC_SURREAL_DATABASE ?? 'test';


const db = new Surreal();
export async function initDB() {
    try {
        console.log(`Initializing database...endpoint is ${SurrealEndpoint}`);
        await db
            .connect(SurrealEndpoint)
            .then(() => {
                console.log("Connected to database");
            })
            .catch((err) => {
                console.log("Error connecting to database", err);
            });

        // db sign-in 
        await db
            .signin({
                user: process.env.REACT_APP_ADMIN_NAME,
                pass: process.env.REACT_APP_ADMIN_PASS,
            })
            .then((res) => {
                console.log("Signed in to database", res);
            })
            .catch((err) => {
                console.log("Signin Error signing in to database", err);
            });
        console.log("namespace: ", SurrealNamespace);

        // connect to relevant namespace
        await db.use(SurrealNamespace, SurrealDatabase)
        .then((res) =>{
            console.log("Setup successful", res);
        })
        .catch(
            async (err) => {
                try {
                    // Attempt to define the namespace and database using environment variables.
                    await db.query(`DEFINE NAMESPACE ${process.env.REACT_APP_NEXT_PUBLIC_SURREAL_NAMESPACE}`);
                    await db.query(`DEFINE DATABASE ${process.env.REACT_APP_NEXT_PUBLIC_SURREAL_DATABASE}`);
                } 
                catch (recoveryError) {
                    console.log("Failed to recover. Additional error:", recoveryError);
                }
            }
        )
    } catch (e) {
        console.error('ERROR!!!', e);
    }
}

export default db;

