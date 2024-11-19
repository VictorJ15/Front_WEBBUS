
export class AsignacionDto {
    public id?: number | null;
    public idConductor?: number | null;
    public idBus?: number | null;
    public idRuta?: number | null;
    public idHorario?: Number | null;

    public constructor(init?: Partial<AsignacionDto>) {
        Object.assign(this, init);
    }
}
