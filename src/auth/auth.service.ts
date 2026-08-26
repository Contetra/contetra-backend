import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/common/drizzle/drizzle.module';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { userTable } from 'src/common/drizzle/schema';
import type { CreateAuthDto } from './dto/create-auth.dto';
import { EmailService } from 'src/email/email.service';
import { EmailTemplateService } from 'src/email/email-template.service';
import { EMAIL_RECIPIENTS } from 'src/email/email-recipients';

type JwtPayload = { userId: string; email: string };
export type User = typeof userTable.$inferSelect;
export type NewUser = typeof userTable.$inferInsert;

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly templateService: EmailTemplateService,
  ) {}

  async register(dto: CreateAuthDto) {
    const exists = await this.db
      .select({ id: userTable.id })
      .from(userTable)
      .where(eq(userTable.email, dto.email));
    if (exists.length > 0) throw new ConflictException('Email already exists');

    const existsUserName = await this.db
      .select({ id: userTable.id })
      .from(userTable)
      .where(eq(userTable.user_name, dto.user_name));
    if (existsUserName.length > 0)
      throw new ConflictException('Username already exists');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const inserted = await this.db
      .insert(userTable)
      .values({
        name: dto.name,
        user_name: dto.user_name,
        password: hashedPassword,
        email: dto.email,
      })
      .returning({ id: userTable.id, email: userTable.email });

    const created = inserted[0];
    const payload: JwtPayload = {
      userId: created.id,
      email: dto.email,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async login(dto: Pick<CreateAuthDto, 'email' | 'password'>) {
  

    const rows = await this.db
      .select({
        id: userTable.id,
        email: userTable.email,
        password: userTable.password,
      })
      .from(userTable)
      .where(eq(userTable.email, dto.email))
      .limit(1);

    const user = rows[0];
    if (!user || !user.password) {
      throw new ConflictException('Invalid credentials');
    }

    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new ConflictException('Invalid credentials');

    const payload: JwtPayload = {
      userId: user.id,
      email: user.email ?? dto.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
      message: 'Login Successful',
    };
  }
}
