using System;
using Application.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
   public MappingProfiles()
   {
      CreateMap<Domain.Activity, Activity>();
      CreateMap<CreateActivityDto, Activity>();
      CreateMap<EditActivityDto, Activity>();
 }
}
