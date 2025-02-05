export const formatName = (fullName: string): { firstName: string; lastName?: string } => {
    const nameParts = fullName.trim().split(/\s+/);
    
    if (nameParts.length === 1) {
        return { firstName: nameParts[0] };
    }

    return {
        firstName: nameParts.slice(0, -1).join(' '),
        lastName: nameParts[nameParts.length - 1],
    };
};
