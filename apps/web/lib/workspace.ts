import { getUser, isAdmin } from '@repo/auth';
import { MemberRole, prisma, type Prisma } from '@repo/db';

import { error } from './error';

export async function isWorkspaceIdAvailable(id: string) {
	const workspace = await prisma.workspace.findUnique({
		where: {
			id,
		},
		select: {
			id: true,
		},
	});

	return !workspace;
}

export async function createWorkspace(
	data: Pick<Prisma.WorkspaceCreateInput, 'id' | 'name'>,
) {
	const user = (await getUser()) ?? error();

	const workspace = await prisma.workspace.create({
		data: {
			...data,
			members: {
				create: [
					{
						userId: user.id,
						role: MemberRole.ADMIN,
					},
				],
			},
		},
	});

	return workspace;
}

export async function updateWorkspace(
	id: string,
	data: Pick<Prisma.WorkspaceUpdateInput, 'id' | 'name'>,
) {
	const user = (await getUser()) ?? error();

	if (!isAdmin(id, user.id)) error();

	const workspace = await prisma.workspace.update({
		where: {
			id,
		},
		data: {
			...data,
			updatedAt: new Date(),
		},
	});

	return workspace;
}
