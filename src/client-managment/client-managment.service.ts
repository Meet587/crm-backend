import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { AssignClientToAgentReqDto } from 'src/client-managment/dtos/assign-client-to-agent-req.dto';
import { CreateClientRequestDto } from 'src/client-managment/dtos/create-client-req.dto';
import { UpdateLeadStatusReqDto } from 'src/client-managment/dtos/update-lead-status-req.dto';
import { UserEntity } from 'src/db/entities/user.entity';
import { ClientRepository } from 'src/db/repositories/client.repository';
import { UserService } from 'src/users/users.service';
import { PropertyManagmentService } from './../property-managment/property-managment.service';

@Injectable()
export class ClientManagmentService {
  constructor(
    // @Inject(REQUEST) request: Request,
    @Inject('clientRepositoryInterface')
    private readonly clientRepository: ClientRepository,
    private readonly userService: UserService,
    private readonly propertyManagmentService: PropertyManagmentService,
  ) {}

  async getClientList() {
    try {
      const list = await this.clientRepository.findAll({
        order: { id: 'ASC' },
      });
      return list;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createClient(createClientRequestDto: CreateClientRequestDto) {
    try {
      const exist = await this.clientRepository.findByCondition({
        where: {
          phoneNumber: createClientRequestDto.phoneNumber,
        },
      });

      if (!exist) {
        throw new ConflictException('this phone number alredy exist.');
      }

      let user: UserEntity;

      if (createClientRequestDto.agentId) {
        user = await this.userService.findById(createClientRequestDto.agentId);
      }

      return await this.clientRepository.save(createClientRequestDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateClientLeadStatusById(
    id: number,
    updateLeadStatusReqDto: UpdateLeadStatusReqDto,
  ) {
    try {
      const client = await this.findClientById(id);
      client.leadStatus = updateLeadStatusReqDto.status;
      await this.clientRepository.save(client);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findClientById(id: number) {
    try {
      const client = await this.clientRepository.findByCondition({
        where: { id },
        relations: {
          interestedProperties: true,
          assignedAgent: true,
        },
        select: {
          assignedAgent: {
            id: true,
            fname: true,
            lname: true,
            email: true,
          },
        },
      });
      if (!client) {
        throw new NotFoundException('client not found for this id.');
      }
      return client;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async assignClientToAgent(
    assignClientToAgentReqDto: AssignClientToAgentReqDto,
  ) {
    try {
      const client = await this.findClientById(
        assignClientToAgentReqDto.clientId,
      );

      const user = await this.userService.findById(
        assignClientToAgentReqDto.agentId,
      );

      client.agentId = user.id;
      await this.clientRepository.save(client);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addPropertyIntrest(clientId: number, propertyIds: number[]) {
    try {
      const client = await this.findClientById(clientId);
      const ids: number[] = [
        ...new Set([
          ...client.interestedProperties.map((p) => p.id),
          ...propertyIds,
        ]),
      ];
      const properties =
        await this.propertyManagmentService.findByPropertyIds(ids);
      client.interestedProperties = [...properties];
      return await this.clientRepository.save(client);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
