import { Request } from "express";
import * as D from "io-ts/Decoder";
import { isRight } from "fp-ts/Either";

import { MkEndpointError } from "./error";

/**
 * @typeParam I - Body type.
 */
export interface BodyParser<I> {
  /**
   * @param req - Express request.
   * @returns Parsed body.
   */
  parse(req: Request): I;
}

/**
 * BodyParser for a void body.
 */
export const VoidParser = {
  parse: (req: Request) => void {
  }
};

/**
 * BodyParser which validates the data using an io-ts decoder.
 */
export class DecoderParser<I> implements BodyParser<I> {
  /**
   * io-ts decoder.
   */
  decoder: D.Decoder<unknown, I>;

  /**
   * Initialize decoder parser.
   */
  constructor(decoder: D.Decoder<unknown, I>) {
    this.decoder = decoder;
  }

  /**
   * Attempt to parse request body using decoder.
   * @throws Error
   * If the decoded fails to parse the body.
   */
  parse(req: Request): I {
    const decoded = this.decoder.decode(req.body);
    if (isRight(decoded)) {
      return decoded.right;
    }

    throw MkEndpointError({
      error: `Failed to parse request body: ${JSON.stringify(decoded.left, null, 4)}`,
      http_status: 400,
    });
  }
}

/**
 * Represents a request to an endpoint.
 * @typeParam I - Request body type.
 */
export interface EndpointRequest<I> {
  /**
   * The Express request.
   */
  req: Request;

  /**
   * Parsed request body.
   */
  body(): I;
}
