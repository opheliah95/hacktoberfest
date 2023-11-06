import { Surreal } from 'surrealdb.js'

// Define connection details for our surrealdb instance.
export const SurrealEndpoint =
    process.env.REACT_APP_NEXT_PUBLIC_SURREAL_ENDPOINT ?? `http://localhost:8000/rpc`;
export const SurrealNamespace =
    process.env.REACT_APP_NEXT_PUBLIC_SURREAL_NAMESPACE ?? 'test';
export const SurrealDatabase =
    process.env.REACT_APP_NEXT_PUBLIC_SURREAL_DATABASE ?? 'test';
export const AdminName = process.env.REACT_APP_ADMIN_NAME ?? 'root';
export const AdminPass = process.env.REACT_APP_ADMIN_PASS ?? 'root';

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
                username: AdminName,
                password: AdminPass,
            })
            .then((res) => {
                console.log("Signed in to database", res);
            })
            .catch((err) => {
                console.log(`adminname ${AdminName} pass ${AdminPass}`);
                console.log("Signin Error signing in to database", err);
            });
        console.log("namespace: ", SurrealNamespace);

        // connect to relevant namespace
        await db.use({"namespace": SurrealNamespace, "database":SurrealDatabase})
        .then((res) =>{
            console.log("Setup successful", res);
        })
        .catch(
            async (err) => {
                try {
                    // Attempt to define the namespace and database using environment variables.
                    await db.query(`DEFINE NAMESPACE ${SurrealNamespace}`);
                    await db.query(`DEFINE DATABASE ${SurrealDatabase}`);
                    console.log("constructing ...");
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

