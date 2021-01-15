import React from 'react';
import { DayProvider } from './DayProvider';

export var GlobalContext = React.createContext(
	(undefined as unknown) as DayProvider,
);
