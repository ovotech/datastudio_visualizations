import { toMatchImageSnapshot } from "jest-image-snapshot";
import { expect } from "@jest/globals";

expect.extend({ toMatchImageSnapshot });
