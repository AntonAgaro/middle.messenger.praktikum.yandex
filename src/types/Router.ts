export type Route = {
  renderFunc: (args?: any) => any
  payload?: number
}

export type Routes = Record<string, Route>
