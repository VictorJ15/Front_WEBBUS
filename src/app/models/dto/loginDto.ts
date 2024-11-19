export class LoginDto {
    public email?: string|null;
    public password?: string|null;
    public constructor(init?: Partial<LoginDto>) {
        Object.assign(this, init);
    }
}
