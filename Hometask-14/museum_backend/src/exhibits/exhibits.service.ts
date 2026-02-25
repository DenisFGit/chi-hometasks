import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exhibit } from './exhibits.entity';

@Injectable()
export class ExhibitsService {
	constructor(
		@InjectRepository(Exhibit)
		private ExhibitsRepository: Repository<Exhibit>,
	) { }

	async create(imageUrl: string, description: string, userId: number): Promise<Exhibit> {
		const exhibit = this.ExhibitsRepository.create({ imageUrl, description, userId });
		return this.ExhibitsRepository.save(exhibit);
	}

	async delete(exhibitId: number, userId: number): Promise<void> {
		const exhibit = await this.ExhibitsRepository.findOne({ where: { id: exhibitId } });

		if (!exhibit) {
			throw new NotFoundException(`Exhibit with id ${exhibitId} not found`);
		}

		if (exhibit.userId !== userId) {
			throw new ForbiddenException('You can only delete your own exhibits');
		}

		await this.ExhibitsRepository.remove(exhibit);
	}

	async getAll(page: number, limit: number): Promise<{ data: Exhibit[], total: number, page: number, lastPage: number }> {
		const [data, total] = await this.ExhibitsRepository.findAndCount({
			skip: (page - 1) * limit,
			take: limit,
		});

		return {
			data,
			total,
			page,
			lastPage: Math.ceil(total / limit),
		};
	}
}