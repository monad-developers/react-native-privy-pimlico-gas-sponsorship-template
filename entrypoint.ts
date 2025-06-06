// Import required polyfills first
import { Buffer } from 'buffer';
import 'react-native-get-random-values';

global.Buffer = Buffer;

import '@ethersproject/shims';
import 'fast-text-encoding';

// Then import the expo router
import 'expo-router/entry';
