from typing import List

from backend.app.db.repositories.base import BaseRepository
from backend.app.models.building import EmergencyHouseBase, ArchitecturalStats, FloorCountModel, BuiltYearStats
from backend.app.models.core import NameCountBase


class BuildingRepository(BaseRepository):
    async def emergency_house_count(self) -> List[EmergencyHouseBase]:
        record = await self.db.fetch_all(
            query=
            """
            select is_alarm, count(*) as count from building.building
            group by is_alarm;
            """
        )
        return [EmergencyHouseBase(**o) for o in record]

    async def repair_work_count(self) -> List[NameCountBase]:
        record = await self.db.fetch_all(
            query=
            """
            select name, count(*) as count from building.execution_works
            join building.service on service.id = service_id
            group by service_id;
            """
        )
        return [NameCountBase(**o) for o in record]

    async def architectural_stats(self) -> List[ArchitecturalStats]:
        record = await self.db.fetch_all(
            query=
            """
            select count(architectural_monuments_status) as count_architectural_house, count(house_id) as count_all_house from building.building;
            """
        )
        return [ArchitecturalStats(**o) for o in record]

    async def floor_count(self) -> List[FloorCountModel]:
        record = await self.db.fetch_all(
            query=
            """
            select floor_count as floor ,count(*) as count from building.building 
            group by floor_count
            order by floor_count ;
            """
        )
        return [FloorCountModel(**o) for o in record]

    async def avg_housing_availability(self) -> float:
        return (await self.db.fetch_one(
            query=
            """
            select sum(living_rooms_sq)/sum(total_ppl) as avg from building.building;
            """
        ))['avg']

    async def built_year_stat(self) -> List[BuiltYearStats]:
        record = await self.db.fetch_all(
            query=
            """
            select built_year, count(*) as count from building.building 
            group by built_year 
            order by built_year; 
            """
        )
        return [BuiltYearStats(**o) for o in record]


