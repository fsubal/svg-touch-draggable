export type Branded<T, U extends string> = T & { [K in U]: never }

export type Pixel = Branded<number, 'Pixel'>

export type AxisX<N extends number> = Branded<N, 'AxisX'>

export type AxisY<N extends number> = Branded<N, 'AxisY'>
