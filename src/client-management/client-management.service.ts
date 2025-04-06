import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AssignClientToAgentReqDto } from 'src/client-management/dtos/assign-client-to-agent-req.dto';
import { CreateClientRequestDto } from 'src/client-management/dtos/create-client-req.dto';
import { UpdateLeadStatusReqDto } from 'src/client-management/dtos/update-lead-status-req.dto';
import { UserEntity } from 'src/db/entities/user.entity';
import { ClientRepository } from 'src/db/repositories/client.repository';
import { UserService } from 'src/users/users.service';
import { PropertyManagementService } from './../property-management/property-management.service';
import { UpdateClientRequestDto } from 'src/client-management/dtos/update-client-details-req.dto';
import { ClientsEntity } from 'src/db/entities/client.entity';

@Injectable()
export class ClientManagementService {
  constructor(
    // @Inject(REQUEST) request: Request,
    @Inject('clientRepositoryInterface')
    private readonly clientRepository: ClientRepository,
    private readonly userService: UserService,
    private readonly propertyManagementService: PropertyManagementService,
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

      if (exist) {
        throw new ConflictException('this phone number already exist.');
      }

      let user: UserEntity;

      if (createClientRequestDto.agentId) {
        user = await this.userService.findById(createClientRequestDto.agentId);
      }
      if (createClientRequestDto.agentId === 0) {
        createClientRequestDto.agentId = 1;
      }

      return await this.clientRepository.save(createClientRequestDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async clientDetails(id: number) {
    try {
      const client = await this.clientRepository.findByCondition({
        where: { id },
        relations: {
          assignedAgent: true,
          followUps: true,
          interestedProperties: true,
          siteVisits: { property: true },
        },
        select: {
          assignedAgent: {
            id: true,
            email: true,
            fname: true,
            lname: true,
            phoneNumber: true,
          },
          siteVisits: {
            id: true,
            scheduledDate: true,
            status: true,
            agentNotes: true,
            property: {
              address: true,
            },
          },
        },
        // order: {
        //   siteVisits: {
        //     scheduledDate: 'desc',
        //   },
        // },
      });
      if (!client) {
        throw new NotFoundException('client details not found with this id.');
      }
      return client;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateClient(
    clientId: number,
    updateClientRequestDto: UpdateClientRequestDto,
  ) {
    try {
      const exist = await this.clientRepository.findByCondition({
        where: {
          id: clientId,
        },
      });

      const updatedData: ClientsEntity = {
        ...exist,
        ...updateClientRequestDto,
        id: exist.id,
      };

      return await this.clientRepository.save(updatedData);
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

  async addPropertyInterest(clientId: number, propertyIds: number[]) {
    try {
      const client = await this.findClientById(clientId);
      const ids: number[] = [
        ...new Set([
          ...client.interestedProperties.map((p) => p.id),
          ...propertyIds,
        ]),
      ];
      const properties =
        await this.propertyManagementService.findByPropertyIds(ids);
      client.interestedProperties = [...properties];
      return await this.clientRepository.save(client);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
