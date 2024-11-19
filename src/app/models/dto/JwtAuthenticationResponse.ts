export class JwtAuthenticationResponse {
    public token?: string;
    public email?: string;
    public role?: string;
    public constructor(init?: Partial<JwtAuthenticationResponse>) {
        Object.assign(this, init);
    }
}
