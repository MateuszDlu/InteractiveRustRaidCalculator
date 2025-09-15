class Building {
  private id: string;
  private name: string;
  private amount: number;
  private x: number;
  private y: number;

  constructor(name: string, amount: number, x: number, y: number, id?: string) {
    this.id = id ?? "building-" + crypto.randomUUID();
    this.name = name;
    this.amount = amount;
    this.x = x;
    this.y = y;
  }

  public getId(): string { return this.id; }
  public getName(): string { return this.name; }
  public getAmount(): number { return this.amount; }
  public setAmount(amount: number): void { this.amount = amount; }

  public getX(): number { return this.x; }
  public getY(): number { return this.y; }
  public setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}


export default Building;