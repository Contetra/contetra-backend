import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateServiceDto {}

export class CreateServiceDtoTaigasOne {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  first_name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  last_name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  company!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  phone_number!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  designation!: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id!: string;
}

export class CreateServiceDtoTaigasTwo {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  full_name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  company!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  phone_number!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  service!: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id!: string;
}

export class CreateServiceDtoEisOne {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  work_email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  company!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  designation!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  industry!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  phone_number!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  accounting_system!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  help_topic!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  turnover!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  currency!: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id!: string;
}
export class CreateServiceDtoEisTwo {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  company!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  turnover!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  currency!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  accounting_system!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  phone_number!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  work_email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  help_topic!: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id!: string;
}
export class CreateServiceDtoSt {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  work_email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  phone_number!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  company_name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  designation!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  state!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  city!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  hear_about!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  list_items!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  message!: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id!: string;
}

export class CreateServiceDtoOas {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  first_name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  last_name!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  work_email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  company!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  designation!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  phone_number!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  city!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  form_id!: string;
}

export class CreateServiceDtoOasTwo {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  company!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  help_with!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  phone_number!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  designation!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  city!: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id!: string;
}

export class CreateServiceDtoCtOne {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  full_name!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  work_email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  company!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  designation!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  training_mode!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  phone_number!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  help_topic!: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id!: string;
}
export class CreateServiceDtoIr {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  first_name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  last_name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  phone_number!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  work_email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  organization_name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  annual_revenue!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  help_topic!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  message!: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id!: string;
}

export class CreateServiceDtoFrcOne {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  work_email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  company!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  designation!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  how_can_we_help!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  finance_team_size!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  phone_number!: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id!: string;
}

export class CreateServiceDtoSbfms {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  annual_turnover!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  business_industry!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  business_vision!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  city!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  commitment!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  company_name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  currency!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  designation!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  financial_comfort!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  full_name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  mentor_preference!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  phone_number!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  planning_process!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  primary_reason!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  support_type!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  work_email!: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id!: string;
}
