import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillingPaymentDTO, SearchPaymentStatus } from './dto/request/billing-payment.dto';
import { UpdateBuildPaymentDTO } from './dto/request/update-build-payment.dto';
import { BillingPaymentEntity } from './entity/billing-payment.entity';

@Injectable()
export class BillingPaymentRepository {
  constructor(
    @InjectRepository(BillingPaymentEntity)
    private readonly billingPaymentDAO: Repository<BillingPaymentEntity>,
  ) {}

  async getManyBillingPayments(billingPaymentDTO: BillingPaymentDTO, centerId: number) {
    const queryBuilder = this.billingPaymentDAO
      .createQueryBuilder('payment')
      .innerJoin('payment.student', 'student')
      .addSelect(['student.name', 'student.phone'])
      .leftJoin('payment.durationLesson', 'duration')
      .addSelect(['duration.name', 'duration.tuitionFee'])
      .leftJoin('payment.sessionLesson', 'session')
      .addSelect(['session.name', 'session.tuitionFee'])
      .where('payment.centerId = :centerId', { centerId });

    if (billingPaymentDTO.PaymentStatus !== SearchPaymentStatus.ALL) {
      queryBuilder.andWhere('payment.paymentStatus = :paymentStatus', {
        paymentStatus: billingPaymentDTO.PaymentStatus,
      });
    }

    if (billingPaymentDTO.searchBy === 'name') {
      queryBuilder
        .andWhere('student.name LIKE :name', { name: `%${billingPaymentDTO.name}%` })
        .orderBy(`LOCATE('${billingPaymentDTO.name}', student.name)`, 'ASC')
        .addOrderBy('student.name', 'ASC');
    }

    if (billingPaymentDTO.searchBy === 'phone') {
      queryBuilder
        .andWhere('student.phone LIKE :phone', { phone: `%${billingPaymentDTO.phone}%` })
        .orderBy(`LOCATE('${billingPaymentDTO.phone}', student.phone)`, 'ASC')
        .addOrderBy('student.phone', 'ASC');
    }

    if (billingPaymentDTO.searchBy === 'none') queryBuilder.orderBy('payment.createdDate', 'DESC');

    return await queryBuilder.offset(billingPaymentDTO.getSkip()).limit(billingPaymentDTO.getTake()).getManyAndCount();
  }

  async updateBillingPayment(id: number, updateBuildPaymentDTO: UpdateBuildPaymentDTO) {
    const lesson = await this.billingPaymentDAO.findOneBy({ id });

    if (!lesson) {
      throw new BadRequestException('lesson not found');
    }

    return (await this.billingPaymentDAO.update({ id }, { paymentStatus: updateBuildPaymentDTO.paymentStatus }))
      .affected;
  }
}
