import { VERSION_INFO } from './version';

import JSON_DATA from './resource/json.json';
import YAML_DATA from './resource/yaml.yml';

export async function main(argv: Array<string>): Promise<number> {
  // tslint:disable-next-line:no-console
  console.log('Hello World!', VERSION_INFO, JSON_DATA, YAML_DATA, argv);
  return 1;
}
