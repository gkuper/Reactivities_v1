using System;
using AutoMapper;

namespace Application;

public class MappingProfiles : Profile
{
 public MappingProfiles()
 {
    CreateMap<Domain.Activity, Domain.Activity>();
 }
}
