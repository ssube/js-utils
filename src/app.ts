/* tslint:disable:no-default-import */
import JSON_DATA from './resource/json.json';
import YAML_DATA from './resource/yaml.yml';
import { VERSION_INFO } from './version';

export async function main(argv: Array<string>): Promise<number> {
  // tslint:disable-next-line:no-console
  console.log('Hello World!', VERSION_INFO, JSON_DATA, YAML_DATA, argv);
  return 1;
}
