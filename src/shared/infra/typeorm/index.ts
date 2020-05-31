// E para criar múltiplas conexões vamos ter createConnectionS no plural
import { createConnections } from 'typeorm';

// E aqui também mudamos que ele irá criar todas ao mesmo tempo
createConnections();
