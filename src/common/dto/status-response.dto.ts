// src/common/dto/status-response.dto.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class StatusResponse {
  @Field(() => Boolean)
  status!: boolean;

  @Field(() => Int)
  statusCode!: number;

  @Field(() => String)
  message!: string;

  @Field(() => [String], { nullable: true })
  data?: string[];

  @Field(() => String, { nullable: true })
  error?: string; // New field for error details

  // Updated static helper methods
  static success(
    message: string = 'Operation successful',
    statusCode: number = 200,
    data?: string[],
  ): StatusResponse {
    return {
      status: true,
      statusCode,
      message,
      data: data || [],
    };
  }

  static error(
    message: string = 'Operation failed',
    statusCode: number = 400,
    error?: unknown, // Accept the raw error
  ): StatusResponse {
    // Extract error message
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    return {
      status: false,
      statusCode,
      message,
      data: [],
      error: errorMessage, // Include the actual error message
    };
  }
}
