import { ReactNode } from 'react';

export default interface Props {
    stepForward: (signalName:string|null, parameters:Map<string,any>|null) => void,
    children: ReactNode
}