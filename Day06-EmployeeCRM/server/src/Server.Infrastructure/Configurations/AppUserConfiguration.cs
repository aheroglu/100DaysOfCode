using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Domain.Entities;

namespace Server.Infrastructure.Configurations;

public sealed class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
{
    public void Configure(EntityTypeBuilder<AppUser> builder)
    {
        builder.ToTable("Users");

        builder.HasMany(d => d.Employees)
            .WithOne(e => e.CreatedFrom)
            .HasForeignKey(e => e.CreatedFromId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
